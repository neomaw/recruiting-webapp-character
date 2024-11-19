import { SKILL_LIST } from '../../consts'
import styles from './SkillsEditor.module.css'

const SkillsEditor = ({character, onUpdate}) => {

    
    const calculateModifier = (attribute) => {
        return Math.floor((attribute - 10) / 2)
    }

    const totalSkillPoints = 10 + 4 * calculateModifier(character.attributes.Intelligence);
    const allocatedSkillPoints = Object.values(character.skills).reduce((total, points) => total + points, 0);
    const availableSkillPoints = totalSkillPoints - allocatedSkillPoints;


    const handleSkillChange = (skill, value) => {
        console.log("availableSkillPoints: ",availableSkillPoints, "value: ",value)
        if (availableSkillPoints - value >= 0) {
            const newSkillValue = {...character.skills, [skill.name]:character.skills[skill.name] + value}
            onUpdate({...character, skills: newSkillValue})
        }
        else{
            alert("No available skill points")
        }
    }

    const calculateEachSkillPoints = (skill) => {
        return character.skills[skill.name]  + calculateModifier(character.attributes[skill.attributeModifier])
    }

    return (
        <div className={styles.skillsContainer}>
            <h1>Skills</h1>
            <span>Available Skill Points: {availableSkillPoints}</span>
            <div className={styles.skillsList}>
                {
                    SKILL_LIST.map((skill) => (
                        <div className={styles.skillItem} key={skill.name}>
                            <span> {skill.name} : {character.skills[skill.name]} </span>
                            <span className={styles.skillModifier}> 
                                Modifier-{skill.attributeModifier} : {calculateModifier(character.attributes[skill.attributeModifier])} 
                            </span>
                            <div>
                                <button className={styles.skillButton} onClick={() => handleSkillChange(skill, 1)}>+</button>
                                <button className={styles.skillButton} onClick={() => handleSkillChange(skill, -1)}>-</button>
                            </div>
                            <span> Total: {calculateEachSkillPoints(skill)}</span>
                        </div>
                    ))
                }
            </div> 
        </div>
    )
}

export default SkillsEditor
