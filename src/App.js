import {useState,useRef} from 'react'
import {DndCard,DndContainer} from './DndCard'
import './index.css'

export const App = () => {
  const psalm =`אשרי האיש אשר לא הלך בעצת רשעים ובדרך חטאים לא עמד ובמושב לצים לא ישב כי אם בתורת ה' חפצו ובתורתו יהגה יומם ולילה והיה כעץ שתול על פלגי מים אשר פריו יתן בעתו ועלהו לא יבול וכל אשר יעשה יצליח לא כן הרשעים כי אם כמץ אשר תדפנו רוח על כן לא יקמו רשעים במשפט וחטאים בעדת צדיקים כי יודע ה' דרך צדיקים ודרך רשעים תאבד`
  let vPsalm = psalm.split(" ")
  // vPsalm = vPsalm.sort((a, b) => 0.5 - Math.random());

  const [cards,setCards] = useState( [...Array(67).keys()].map( i => 
    {return {id:i,val:vPsalm[i]} }) )

  const renderCards = () => { 
    return cards.map( i => { 
      return (<DndCard card={i} key={i.id}>{i.val}
              </DndCard>)

    })
   }  
  
  return (
    <DndContainer cards={cards} setCards={setCards} className='cards-flex-container'>
        {renderCards()}
    </DndContainer>
  )
}

export default App  