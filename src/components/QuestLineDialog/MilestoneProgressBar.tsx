import React from 'react'

export interface MilestoneProgressBarProps {
  totalQuests: number
  completedQuests: number
}

export const MilestoneProgressBar: React.FC<MilestoneProgressBarProps> = ({
  totalQuests,
  completedQuests,
}) => {
  const progressPercent = (completedQuests / totalQuests) * 100

  return (
    <div className="milestone-progress">
      <div className="milestone-progress__bar">
        <div
          className="milestone-progress__fill"
          data-progress={progressPercent}
        />
      </div>
      <div className="milestone-progress__text">
        <span className="milestone-progress__count">{progressPercent.toFixed(0)}%</span>
      </div>
    </div>
  )
}
