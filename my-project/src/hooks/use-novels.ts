"use client"

import { useState, useEffect } from "react"
import type { Novel } from "@/types/novel"
import { novels as initialNovels } from "@/data/novels"

const STORAGE_KEY = "novels-data"

export function useNovels() {
  const [novels, setNovels] = useState<Novel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedNovels = localStorage.getItem(STORAGE_KEY)
    if (savedNovels) {
      try {
        setNovels(JSON.parse(savedNovels))
      } catch (error) {
        console.error("Error parsing saved novels:", error)
        setNovels(initialNovels)
      }
    } else {
      setNovels(initialNovels)
    }
    setIsLoading(false)
  }, [])

  const saveNovels = (newNovels: Novel[]) => {
    setNovels(newNovels)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNovels))
  }

  const addNovel = (novel: Novel) => {
    const newNovels = [...novels, novel]
    saveNovels(newNovels)
  }

  const updateNovel = (id: string, updatedNovel: Novel) => {
    const newNovels = novels.map((novel) => (novel.id === id ? updatedNovel : novel))
    saveNovels(newNovels)
  }

  const deleteNovel = (id: string) => {
    const newNovels = novels.filter((novel) => novel.id !== id)
    saveNovels(newNovels)
  }

  const getNovel = (id: string) => {
    return novels.find((novel) => novel.id === id)
  }

  return {
    novels,
    isLoading,
    addNovel,
    updateNovel,
    deleteNovel,
    getNovel,
  }
}
