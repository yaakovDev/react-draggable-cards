import {useState,useRef} from 'react'
import './index.css'

export const App = () => {
  const psalm =`אשרי האיש אשר לא הלך בעצת רשעים ובדרך חטאים לא עמד ובמושב לצים לא ישב כי אם בתורת ה' חפצו ובתורתו יהגה יומם ולילה והיה כעץ שתול על פלגי מים אשר פריו יתן בעתו ועלהו לא יבול וכל אשר יעשה יצליח לא כן הרשעים כי אם כמץ אשר תדפנו רוח על כן לא יקמו רשעים במשפט וחטאים בעדת צדיקים כי יודע ה' דרך צדיקים ודרך רשעים תאבד`
  let vPsalm = psalm.split(" ")
  // vPsalm = vPsalm.sort((a, b) => 0.5 - Math.random());

  const [cards,setCards] = useState( [...Array(67).keys()].map( i => 
    {return {id:i,val:vPsalm[i]} }) )
  const draggedCard = useRef(null)

const onClick = (i) => { console.log(i.id) }

const onDragStart = (e,card) => {
  // console.log(`dragging:${id}...`)
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData("text/plain", card.id);
  if (draggedCard.current)
    draggedCard.current.className='card-flex-item'
  draggedCard.current = e.target
  e.target.className='card-flex-item on-drag-over'
  setTimeout(() => e.target.className='card-flex-item', 0)
  // e.preventDefault();
  //hide dragging silhouette
  // var img = document.createElement("div"); 
  // e.dataTransfer.setDragImage(img, 0, 0);    
}

const onDragOver = (e,toCard) => {
  console.log(`onDragOver`)
  // e.target.className+=' on-drag-over'
  // const from_id = +e.dataTransfer.getData("text/plain");
  // renderDnd(from_id,toCard.id)
  // renderDnd(from_id,toCard.id)
  e.preventDefault();
  //const temp = cardRef.current
  //cardRef.current = e.target
  //e.target = temp
  
}

const onDragLeave = (e) => {
  // e.target.className='card-flex-item'
  e.preventDefault();
  //e.target
  // cardRef.current.style.border ="3px solid green";
}

const onDragDrop = (e,toCard) => { 
  const from_id = +e.dataTransfer.getData("text/plain");
  draggedCard.current.className='card-flex-item on-drag-over'
  renderDnd(from_id,toCard.id)
  // e.target.className='card-flex-item on-drag-over'
  //setTimeout(() => draggedCard.current.className='card-flex-item',200)

  e.preventDefault();
  //Tried to implement it inside hook, but yields strange behavoir
  // setCards( prev => { 
  //     const toIndex = prev.findIndex( i=> (i.id==to_card.id))
  //     const fromIndex = prev.findIndex( i=> (i.id== from_id))
  //     if ( fromIndex > toIndex) {
  //       console.log('here-1')
  //       prev.splice(toIndex,0, prev[fromIndex])
  //       prev.splice(fromIndex+1,1)
  //       }
  //     else{
  //       console.log('here-2')
  //       let save = prev[fromIndex]
  //       prev.splice(fromIndex,1)
  //       prev.splice(toIndex,0,save)
  //       }
  //     return [...prev]
  //     })
}  

const renderDnd = (fromId,toId) => { 
  const fromIndex = cards.findIndex( i=> (i.id==fromId))
  const toIndex = cards.findIndex( i=> (i.id==toId))
  if ( fromIndex > toIndex) {
    cards.splice(toIndex,0, cards[fromIndex])//add
    cards.splice(fromIndex+1,1)//remove
    }
  else{
    let save = cards[fromIndex]
    cards.splice(fromIndex,1)//remove
    cards.splice(toIndex,0,save)//add
    }
    setCards( [...cards] )
}


  
  const renderCards = () => { 
    return cards.map( i => { 
      return (<div key={i.id} draggable="true" 
        // onClick={ e => onClick(i)}
        onDragStart={e =>onDragStart(e,i)} 
        onDragOver= {e => onDragOver(e,i) } 
        onDragLeave={e => onDragLeave(e) }
        onDrop={ e => onDragDrop(e,i)}
        className="card-flex-item">
        {i.val}
        </div>
        )

    })
   }  
  
  return (
    <div className='cards-flex-container'>
        {renderCards()}
    </div>
  )
}

export default App  