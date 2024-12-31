"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Circle, CheckCircle2 } from 'lucide-react'

const stages = [
  { id: 1, name: "Документы" },
  { id: 2, name: "На погрузке" },
  { id: 3, name: "В дороге" },
  { id: 4, name: "На выгрузке" },
  { id: 5, name: "Оплатили" },
]

export default function DeliveryProgress() {
  const [currentStage, setCurrentStage] = useState(0)

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        {/* Базовая линия */}
        <div className="absolute top-[14px] left-0 w-full h-0.5 bg-gray-200" />

        {/* Линия прогресса */}
        <motion.div
          className="absolute top-[14px] left-0 h-0.5 bg-emerald-500"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Точки этапов */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="flex flex-col items-center"
              style={{ width: '20%' }}
            >
              <button
                onClick={() => setCurrentStage(index)}
                className="relative z-10 focus:outline-none group"
              >
                <motion.div
                  initial={false}
                  animate={index <= currentStage ? "active" : "inactive"}
                  variants={{
                    active: {
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    },
                    inactive: {
                      scale: 1,
                      transition: { duration: 0.2 }
                    },
                  }}
                >
                  {index <= currentStage ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 drop-shadow-sm" />
                  ) : (
                    <Circle className="w-7 h-7 text-gray-300 drop-shadow-sm" />
                  )}
                </motion.div>
              </button>
              <span
                className={`text-xs mt-2 text-center transition-colors duration-200 px-1 ${
                  index <= currentStage
                    ? 'text-emerald-600 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
