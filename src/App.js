import {useState,useRef} from 'react'
import {DndCard,DndContainer} from './DndCard'
import './index.css'

const psalm =`אשרי האיש אשר לא הלך בעצת רשעים ובדרך חטאים לא עמד ובמושב לצים לא ישב כי אם בתורת ה' חפצו ובתורתו יהגה יומם ולילה והיה כעץ שתול על פלגי מים אשר פריו יתן בעתו ועלהו לא יבול וכל אשר יעשה יצליח לא כן הרשעים כי אם כמץ אשר תדפנו רוח על כן לא יקמו רשעים במשפט וחטאים בעדת צדיקים כי יודע ה' דרך צדיקים ודרך רשעים תאבד`
let vPsalm = psalm.split(" ")
// vPsalm = vPsalm.sort((a, b) => 0.5 - Math.random()); //shuffle

export const App = () => {

  const [cards,setCards] = useState( vPsalm.map( (i,index) => {return {id:index,val:i}} ) )

  const renderCards = () => { 
    return cards.map( i => { 
      return (<DndCard card={i} cardKey={i.id} key={i.id}>{i.val}
              </DndCard>)

    })
   }  
  
  return (
    <DndContainer cards={cards} setCards={setCards} dndLogics='rtl' className='cards-flex-container'>
        {renderCards()}
    </DndContainer>
  )
}

export default App  