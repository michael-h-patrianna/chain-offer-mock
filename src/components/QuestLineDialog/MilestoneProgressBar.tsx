import React from 'react'

export interface MilestoneProgressBarProps {
  totalQuests: number
  completedQuests: number
}

export const MilestoneProgressBar = ({
  totalQuests,
  completedQuests,
}: MilestoneProgressBarProps) => {
  const progressPercent = (completedQuests / totalQuests) * 100

  return (
    <div className="milestone-progress">
      <div
        className="milestone-progress__bar"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Quest completion progress: ${String(completedQuests)} of ${String(totalQuests)} quests completed`}
      >
        <div
          className="milestone-progress__fill"
          data-progress={progressPercent}
        />
      </div>
      <div className="milestone-progress__text">
        <span className="milestone-progress__count" aria-hidden="true">{progressPercent.toFixed(0)}%</span>
      </div>
    </div>
  )
}
