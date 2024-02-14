import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface SkillItemProps {
  skill: { value: string, source: number };
  index: number;
  moveSkill: (dragIndex: number, hoverIndex: number, sourceBox: number, targetBox: number) => void;
  boxIndex: number;
}

export default function Skills() {
  const [coreSkills1, setCoreSkills1] = useState<{ value: string, source: number }[]>([{ value: "Finance & Entrepreneurship", source: 1 },{ value: "Maths", source: 1 },{ value: "Commerce", source: 1 },{ value: "Science", source: 1 },{ value: "Language & communication", source: 1 }
  ]);
  const [coreSkills2, setCoreSkills2] = useState([{ value: "Space Tech", source: 2 }, { value: "Robotics", source: 2 }, { value: "Electronics", source: 2 }]);
  const [coreSkills3, setCoreSkills3] = useState<{ value: string, source: number }[]>([{ value: "Graphic Novel", source: 3 }, { value: "Yoga", source: 3 }, { value: "Music", source: 3 }, { value: "Dance", source: 3 }, { value: "Guitar", source: 3 }]);
  const [coreSkills4, setCoreSkills4] = useState<{ value: string, source: number }[]>([]);
  const [coreSkills5, setCoreSkills5] = useState<{ value: string, source: number }[]>([]);

  const moveSkill = (dragInd: number, hoverInd: number, sourceBox: number, targetBox: number) => {
    if (sourceBox === targetBox) {
      let sourceSkills: { value: string, source: number }[];
      if(sourceBox === 4) {
        sourceSkills = coreSkills4;
      }
      else {
        sourceSkills = coreSkills5;
      }

      const newSkills = [...sourceSkills];
      const [draggedSkill] = newSkills.splice(dragInd, 1);
      newSkills.splice(hoverInd, 0, draggedSkill);
      if(sourceBox === 4) {
        setCoreSkills4(newSkills);
      }
      else {
        setCoreSkills5(newSkills);
      }
    } else {
      let sourceSkills: { value: string, source: number }[], targetSkills: { value: string, source: number }[];
      switch (sourceBox) {
        case 1:
          sourceSkills = coreSkills1;
          break;
        case 2:
          sourceSkills = coreSkills2;
          break;
        case 3:
          sourceSkills = coreSkills3;
          break;
        case 4:
          sourceSkills = coreSkills4;
          break;
        case 5:
          sourceSkills = coreSkills5;
          break;
        default:
          return;
      }
      switch (targetBox) {
        case 1:
          targetSkills = coreSkills1;
          break;
        case 2:
          targetSkills = coreSkills2;
          break;
        case 3:
          targetSkills = coreSkills3;
          break;
        case 4:
          targetSkills = coreSkills4;
          break;
        case 5:
          targetSkills = coreSkills5;
          break;
        default:
          return;
      }

      const draggedSkill = sourceSkills[dragInd];
      const newSourceSkills = [...sourceSkills];
      newSourceSkills.splice(dragInd, 1);
      const newTargetSkills = [...targetSkills];
      newTargetSkills.splice(hoverInd, 0, draggedSkill);
      switch (sourceBox) {
        case 1:
          setCoreSkills1(newSourceSkills);
          break;
        case 2:
          setCoreSkills2(newSourceSkills);
          break;
        case 3:
          setCoreSkills3(newSourceSkills);
          break;
        case 4:
          setCoreSkills4(newSourceSkills);
          break;
        case 5:
          setCoreSkills5(newSourceSkills);
          break;
      }
      switch (targetBox) {
        case 1:
          setCoreSkills1(newTargetSkills);
          break;
        case 2:
          setCoreSkills2(newTargetSkills);
          break;
        case 3:
          setCoreSkills3(newTargetSkills);
          break;
        case 4:
          setCoreSkills4(newTargetSkills);
          break;
        case 5:
          setCoreSkills5(newTargetSkills);
          break;
      }
    }

    if (sourceBox === 1 && sourceBox !== targetBox) {
      const newSkills = [...coreSkills1];
      newSkills.splice(dragInd, 1);
      setCoreSkills1(newSkills);
    }

    if (sourceBox === 2 && sourceBox !== targetBox) {
      const newSkills = [...coreSkills2];
      newSkills.splice(dragInd, 2);
      setCoreSkills2(newSkills);
    }

    if (sourceBox === 3 && sourceBox !== targetBox) {
      const newSkills = [...coreSkills3];
      newSkills.splice(dragInd, 3);
      setCoreSkills3(newSkills);
    }
  };

  const SkillItem = ({ skill, index, moveSkill, boxIndex }: SkillItemProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'box',
      item: { skill, index, boxIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }), [skill, index, boxIndex]);

    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
      accept: 'box',
      drop(item: { index: number; boxIndex: number }) {
        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceBox = item.boxIndex;
        const targetBox = boxIndex;

        moveSkill(dragIndex, hoverIndex, sourceBox, targetBox);
        item.index = hoverIndex;
        item.boxIndex = targetBox;
      },
    });

    drag(drop(ref));

    const handleCancel = (skill: { value: string, source: number }, index: number, boxIndex: number) => {
      if (skill.source === 1) {
        const newSkills = [...coreSkills1];
        newSkills.push(skill);
        setCoreSkills1(newSkills);
      }

      if (skill.source === 2) {
        const newSkills = [...coreSkills2];
        newSkills.push(skill);
        setCoreSkills2(newSkills);
      }

      if (skill.source === 3) {
        const newSkills = [...coreSkills3];
        newSkills.push(skill);
        setCoreSkills3(newSkills);
      }

      if (boxIndex === 4) {
        const newBoxSkills = [...coreSkills4];
        newBoxSkills.splice(index, 1);
        setCoreSkills4(newBoxSkills);
      }
      else {
        const newBoxSkills = [...coreSkills5];
        newBoxSkills.splice(index, 1);
        setCoreSkills5(newBoxSkills);
      }
    };

    return (
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'pointer', background: (skill.source === 1 && '#EDFED7') || (skill.source === 2 && '#FEEBEB') || (skill.source === 3 && '#FDE7FD') || '', border: '1px solid', borderColor: (skill.source === 1 && '#71CA00') || (skill.source === 2 && '#F85858') || (skill.source === 3 && '#DF45E2') || '', padding: '8px', borderRadius: '8px', fontSize: '18px', color: '#5A5D61', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: skill.value === "Drag any skill here" ? "150px" : "auto"
        }}
      >
        <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 28px)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {skill.value}
        </span>
        {skill.value !== "Drag any skill here" && <button
          onClick={() => handleCancel(skill, index, boxIndex)}
          style={{
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: 0,
            display: 'inline-flex'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="3" fill="#373E49" />
            <path d="M7.02426 6.17574C6.78995 5.94142 6.41005 5.94142 6.17574 6.17574C5.94142 6.41005 5.94142 6.78995 6.17574 7.02426L9.15147 10L6.17574 12.9757C5.94142 13.2101 5.94142 13.59 6.17574 13.8243C6.41005 14.0586 6.78995 14.0586 7.02426 13.8243L10 10.8485L12.9757 13.8243C13.2101 14.0586 13.59 14.0586 13.8243 13.8243C14.0586 13.59 14.0586 13.2101 13.8243 12.9757L10.8485 10L13.8243 7.02426C14.0586 6.78995 14.0586 6.41005 13.8243 6.17574C13.59 5.94142 13.2101 5.94142 12.9757 6.17574L10 9.15147L7.02426 6.17574Z" fill="white" />
          </svg>
        </button>}
      </div>
    );
  };

  interface DraggableItemProps {
    type: string;
    index: number;
    boxIndex: number;
    skill: { value: string, source: number };
    children: React.ReactNode;
  }

  const DraggableItem = ({ skill, index, boxIndex, type, children }: DraggableItemProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: type,
      item: { skill, index, boxIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }), [type, index, boxIndex, skill]);

    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer', background: (skill.source === 1 && '#EDFED7') || (skill.source === 2 && '#FEEBEB') || (skill.source === 3 && '#FDE7FD') || '', border: '1px solid', borderColor: (skill.source === 1 && '#71CA00') || (skill.source === 2 && '#F85858') || (skill.source === 3 && '#DF45E2') || '', padding: '8px', borderRadius: '8px', fontSize: '18px', color: '#5A5D61', fontWeight: '500' }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="box box-1">
        <div className="box-header">
          <h2>School Level</h2>
        </div>
        <div className="box-content">
          <div className="level-box">
            <h3>Level 0</h3>
            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2099 8.03505C17.7566 7.48832 18.643 7.48832 19.1898 8.03505L24.7898 13.6351C25.3365 14.1818 25.3365 15.0682 24.7898 15.6149L19.1898 21.2149C18.643 21.7617 17.7566 21.7617 17.2099 21.2149C16.6631 20.6682 16.6631 19.7818 17.2099 19.2351L20.4199 16.025H4.19981C3.42661 16.025 2.7998 15.3982 2.7998 14.625C2.7998 13.8518 3.42661 13.225 4.19981 13.225H20.4199L17.2099 10.0149C16.6631 9.46822 16.6631 8.58178 17.2099 8.03505Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="box box-2">
        <div className="box-header">
          <h2>Skills Selected</h2>
        </div>
        <div className="box-content">
          <div className="skills-box">
            <h3>Core <span>(Level 0)</span></h3>
            <div className="skills">
              {coreSkills1.map((skill, index) => <DraggableItem key={index} skill={skill} index={index} boxIndex={1} type="box">
                {skill.value}
              </DraggableItem>)}
            </div>
          </div>
          <div className="skills-box">
            <h3>Special <span>(Level 0)</span></h3>
            <div className="skills">
              {coreSkills2.map((skill, index) => <DraggableItem key={index} skill={skill} index={index} boxIndex={2} type="box">
                {skill.value}
              </DraggableItem>)}
            </div>
          </div>
          <div className="skills-box">
            <h3>Creative <span>(Level 0)</span></h3>
            <div className="skills">
              {coreSkills3.map((skill, index) => <DraggableItem key={index} skill={skill} index={index} boxIndex={3} type="box">
                {skill.value}
              </DraggableItem>)}
            </div>
          </div>
        </div>
      </div>

      {/* Note: Skills can be only sorted or reodered after dragging them to the skill priority section */}
      <div className="box box-3">
        <div className="box-header">
          <h2>Set Skill Priority</h2>
        </div>
        <div className="box-content">
          <div className="skill-priority-box">
            <h3>School Priority</h3>
            <div className="priority-box">
              {coreSkills4.length ? coreSkills4.map((skill, index) => (
                <SkillItem
                  key={index}
                  skill={skill}
                  index={index}
                  moveSkill={moveSkill}
                  boxIndex={4}
                />
              )) : <SkillItem
                key={0}
                skill={{ value: 'Drag any skill here', source: 1 }}
                index={0}
                moveSkill={moveSkill}
                boxIndex={4}
              />}
            </div>
          </div>
          <div className="skill-priority-box">
            <h3>Home Priority</h3>
            <div className="priority-box">
              {coreSkills5.length ? coreSkills5.map((skill, index) => (
                <SkillItem
                  key={index}
                  skill={skill}
                  index={index}
                  moveSkill={moveSkill}
                  boxIndex={5}
                />
              )) : <SkillItem
                key={0}
                skill={{ value: 'Drag any skill here', source: 1 }}
                index={0}
                moveSkill={moveSkill}
                boxIndex={5}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}