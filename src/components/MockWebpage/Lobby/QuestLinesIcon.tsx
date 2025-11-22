import React from 'react'

interface QuestLinesIconProps {
  onClick: () => void
}

export const QuestLinesIcon = ({ onClick }: QuestLinesIconProps) => {
  return (
    <section className="QuestLinesEntryLayout_root__h1YjJ QuestLines_questLineEntryRoot__E2d9m" onClick={onClick} style={{cursor: 'pointer'}}>
            <button type="button" className="QuestLinesEntryLayout_button__2uONe">
              <img
                alt="questlines feature icon"
                src="/images/questline-icon.png"
              />
              <div className="QuestLinesEntryLayout_content__64GDs">          <div className="QuestLinesEntryLayout_progressBarWrapper__SnpVa in_progress">
            <div className="ProgressBar_root__DqmA4" style={{'--quests-progress': '0%'} as React.CSSProperties}>
              <progress className="ProgressBar_progress__SXun8" value="0"></progress>
            </div>
          </div>
          <div className="Timer_root__k0daR QuestLinesEntryLayout_timerWrapper__fOtlc in_progress QuestLines_questLineEntryTimerWrapper__RMgBz">
            13:31:19
          </div>
        </div>
      </button>
    </section>
  )
}
