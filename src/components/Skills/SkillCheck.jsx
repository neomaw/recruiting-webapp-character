import React, {useState} from 'react'
import styles from './SkillCheck.module.css'
import { SKILL_LIST } from '../../consts'

const SkillCheck = ({character, onCheckResult}) => {
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDC]  = useState(20); 

    const handleSelectChange =(e) => {
        setSelectedSkill(e.target.value)
    }

    const calculateModifier = (attribute) => {
        return Math.floor((attribute - 10) / 2)
    }

    const handleRoll = () => {
        let skillPoints = character.skills[selectedSkill] 
        for (const ele of SKILL_LIST){
            if (ele.name === selectedSkill){
                skillPoints += calculateModifier(character.attributes[ele.attributeModifier])
            }
        }
        let random = Math.floor(Math.random() * 20) + 1
        console.log("random: ",random, "skillPoints: ",skillPoints, "dc: ",dc)
        onCheckResult(
            character.id, 
            selectedSkill, 
            random + skillPoints >= dc, 
            random,
            skillPoints,
            dc
        )
    }

    return (
        <div className={styles.skillCheckContainer}>
            <h2>Skill Check</h2>

            <span>Skill Name </span>
            <select onChange={(e) => handleSelectChange(e)}>
                {
                    SKILL_LIST.map((skill) => (
                        <option key={skill.name} value={skill.name}>
                            {skill.name}
                        </option>
                    ))
                }
            </select>
            <span> DC </span>
            <input type="number" value={dc} onChange={(e) => setDC(e.target.value)}/>
            <button onClick={handleRoll}>Roll</button>
        </div>
    )
}

export default SkillCheck
