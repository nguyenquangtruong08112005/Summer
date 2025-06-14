# Lightweight Background Music Player for Windows with Extra Features
# Features: Tray icon, play music from folder, shuffle/repeat, adjustable volume, persistent settings, sleep timer, fade-out

import os
import json
import random
import threading
import time
from pathlib import Path
from pygame import mixer
from pystray import Icon, MenuItem as item, Menu
from PIL import Image
from tkinter import Tk, filedialog, simpledialog, Toplevel, Scale, Label, Button, HORIZONTAL

CONFIG_FILE = 'config.json'

class MusicPlayer:
    def __init__(self):
        self.folder = None
        self.playlist = []
        self.current = 0
        self.shuffle = False
        self.repeat = False
        self.playing = False
        self.volume = 0.5
        self.timer_thread = None
        self.fade_out_time = 3  # seconds
        mixer.init()
        self.load_config()
        mixer.music.set_volume(self.volume)

    def load_config(self):
        if os.path.exists(CONFIG_FILE):
            try:
                with open(CONFIG_FILE, 'r') as f:
                    data = json.load(f)
                    self.volume = data.get('volume', 0.5)
                    folder = data.get('folder')
                    if folder and os.path.exists(folder):
                        self.set_folder(folder)
            except Exception as e:
                print("Lỗi khi tải cấu hình:", e)

    def save_config(self):
        try:
            with open(CONFIG_FILE, 'w') as f:
                json.dump({"folder": str(self.folder) if self.folder else "", "volume": self.volume}, f)
        except Exception as e:
            print("Lỗi khi lưu cấu hình:", e)

    def set_folder(self, folder):
        SUPPORTED_FORMATS = (".mp3", ".wav", ".ogg", ".flac")
        self.folder = Path(folder)
        self.playlist = list(self.folder.rglob("*"))
        self.playlist = [f for f in self.playlist if f.suffix.lower() in SUPPORTED_FORMATS]
        self.current = 0
        self.save_config()

    def play(self):
        if not self.playlist:
            return
        try:
            mixer.music.load(self.playlist[self.current])
            mixer.music.play()
            mixer.music.set_volume(self.volume)
            self.playing = True
        except Exception as e:
            print("Lỗi phát nhạc:", e)

    def pause(self):
        if self.playing:
            mixer.music.pause()
            self.playing = False
        else:
            mixer.music.unpause()
            self.playing = True

    def stop(self):
        if self.playing:
            for i in range(10, -1, -1):
                mixer.music.set_volume(self.volume * i / 10)
                time.sleep(self.fade_out_time / 10)
        mixer.music.stop()
        mixer.music.set_volume(self.volume)
        self.playing = False

    def next(self):
        if self.shuffle:
            self.current = random.randint(0, len(self.playlist) - 1)
        else:
            self.current = (self.current + 1) % len(self.playlist)
        self.play()

    def prev(self):
        self.current = (self.current - 1) % len(self.playlist)
        self.play()

    def toggle_shuffle(self):
        self.shuffle = not self.shuffle
        return self.shuffle

    def toggle_repeat(self):
        self.repeat = not self.repeat
        return self.repeat

    def set_volume(self, v):
        self.volume = max(0.0, min(1.0, v))
        mixer.music.set_volume(self.volume)
        self.save_config()

    def start_sleep_timer(self, minutes):
        def timer():
            time.sleep(minutes * 60)
            self.stop()
        if self.timer_thread and self.timer_thread.is_alive():
            return
        self.timer_thread = threading.Thread(target=timer, daemon=True)
        self.timer_thread.start()

# --- Tray Icon ---
def create_icon(player):
    def update_tooltip():
        if player.playlist:
            try:
                icon.title = f"🎵 {player.playlist[player.current].stem}"
            except:
                icon.title = "🎵 Nhạc nền"

    def on_play_pause():
        player.pause()
        update_tooltip()

    def on_next():
        player.next()
        update_tooltip()

    def on_prev():
        player.prev()
        update_tooltip()

    def choose_folder():
        root = Tk()
        root.withdraw()
        folder = filedialog.askdirectory(title="Chọn thư mục nhạc")
        root.destroy()
        if folder:
            player.set_folder(folder)
            player.play()
            update_tooltip()

    def set_custom_volume():
        root = Tk()
        root.withdraw()
        top = Toplevel(root)
        top.title("Chỉnh âm lượng")
        Label(top, text="Âm lượng hiện tại: {:.0f}%".format(player.volume * 100)).pack(pady=5)
        vol_slider = Scale(top, from_=0, to=100, orient=HORIZONTAL)
        vol_slider.set(int(player.volume * 100))
        vol_slider.pack(padx=20, pady=5)
        Button(top, text="OK", command=lambda: (player.set_volume(vol_slider.get() / 100), top.destroy(), root.destroy())).pack(pady=5)
        top.mainloop()

    def set_timer():
        root = Tk()
        root.withdraw()
        min_str = simpledialog.askstring("Hẹn giờ", "Tắt nhạc sau bao nhiêu phút?")
        try:
            minutes = int(min_str)
            player.start_sleep_timer(minutes)
        except:
            pass
        root.destroy()

    def on_quit():
        player.stop()
        icon.visible = False
        icon.stop()

    def on_shuffle_toggle(icon_item):
        icon_item.checked = player.toggle_shuffle()

    def on_repeat_toggle(icon_item):
        icon_item.checked = player.toggle_repeat()

    icon_menu = Menu(
        item("🗂️ Chọn thư mục", choose_folder),
        item("▶️ Phát / ⏸️ Tạm dừng", on_play_pause),
        item("⏮️ Bài trước", on_prev),
        item("⏭️ Tiếp theo", on_next),
        item("🔀 Shuffle", on_shuffle_toggle, checked=lambda item: player.shuffle),
        item("🔁 Lặp lại", on_repeat_toggle, checked=lambda item: player.repeat),
        item("🔊 Âm lượng...", set_custom_volume),
        item("⏱️ Hẹn giờ tắt", set_timer),
        item("❌ Thoát", on_quit)
    )

    icon_path = Path(__file__).parent / "icon.gif"
    if icon_path.exists():
        image = Image.open(icon_path)
    else:
        image = Image.new('RGB', (64, 64), color=(0, 100, 200))

    icon = Icon("Nhạc nền", image, menu=icon_menu)

    def monitor():
        while icon.visible:
            if not mixer.music.get_busy() and player.playing:
                if player.repeat:
                    player.play()
                else:
                    player.next()
                update_tooltip()
            time.sleep(1.5)

    threading.Thread(target=monitor, daemon=True).start()
    update_tooltip()
    return icon

# --- Main ---
if __name__ == '__main__':
    player = MusicPlayer()
    tray = create_icon(player)
    tray.run()
