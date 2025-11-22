import cx from 'classnames'
import React from 'react'

export interface QuestHeaderProps {
  title: string
  description?: string
  progress: number
  isLocked?: boolean
}

export interface QuestHeaderContentProps {
  title: string
  description?: string
  isLocked?: boolean
}

export const QuestHeaderContent = ({ title, description, isLocked = false }: QuestHeaderContentProps) => {
  return (
    <div className='quest-header__info'>
      <h3 className='quest-header__title'>{title}</h3>
      {description && !isLocked && <p className='quest-header__description'>{description}</p>}
    </div>
  )
}

export const QuestHeader = ({ title, description, progress, isLocked = false }: QuestHeaderProps) => {
  const progressValue = Math.min(100, Math.max(0, Math.round(progress)))
  const progressClass = `quest-header__progress-fill--${String(progressValue)}`

  return (
    <div className='quest-header'>
      <div className='quest-header__content'>
        <QuestHeaderContent title={title} description={description} isLocked={isLocked} />
      </div>
      <div className='quest-header__progress-bar'>
        <div className={cx('quest-header__progress-fill', progressClass)} />
      </div>
      <span className='quest-header__progress-text'>{String(progressValue)}%</span>
    </div>
  )
}
