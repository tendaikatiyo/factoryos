import { useEffect, useState } from 'react'
import { seedData, STORAGE_KEY } from './data'
import type { FactoryData } from './types'

const cloneSeed = (): FactoryData => JSON.parse(JSON.stringify(seedData)) as FactoryData

const loadData = (): FactoryData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as FactoryData) : cloneSeed()
  } catch {
    return cloneSeed()
  }
}

export function useFactoryData() {
  const [data, setData] = useState<FactoryData>(loadData)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const reset = () => setData(cloneSeed())

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `factoryos-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importData = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as FactoryData
        if (!parsed.orderConfirmations || !parsed.worksOrders || !parsed.productionRuns) {
          throw new Error('Invalid FactoryOS backup')
        }
        setData(parsed)
      } catch {
        window.alert('This file is not a valid FactoryOS backup.')
      }
    }
    reader.readAsText(file)
  }

  return { data, setData, reset, exportData, importData }
}
