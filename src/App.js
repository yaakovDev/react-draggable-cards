import {useState} from 'react'
import './index.css'

export const App = () => {
  const [cards,setCards] = useState( [...Array(30).keys()].map( i => 
    {return {id:i,val:'x'} }) )

const onClick = (i) => { console.log(i.id) }

const onDragStart = (e,card) => {
  // console.log(`dragging:${id}...`)
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData("text/plain", card.id);

  //hide dragging silhouette
  // var img = document.createElement("div"); 
  // e.dataTransfer.setDragImage(img, 0, 0);    
}

const onDragOver = (e) => {
  console.log(`onDragOver`)
  // e.target.style = "border 2px red solid"
  e.preventDefault();
  //const temp = cardRef.current
  //cardRef.current = e.target
  //e.target = temp
  
}

const onDragLeave = (e) => {
  e.preventDefault();
  //e.target
  // cardRef.current.style.border ="3px solid green";
}

const onDragDrop = (e,to_card) => { 
  console.log(`onDragDrop`)
  const from_id = +e.dataTransfer.getData("text/plain");

  const toIndex = cards.findIndex( i=> (i.id==to_card.id))
  const fromIndex = cards.findIndex( i=> (i.id== from_id))
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
  e.preventDefault();
}  


  
  const renderCards = () => { 
    return cards.map( i => { 
      return (<div key={i.id} draggable="true"
        // onClick={ e => onClick(i)}
        onDragStart={e =>onDragStart(e,i)} 
        onDragOver= {e => onDragOver(e) } 
        onDragLeave={e => onDragLeave(e) }
        onDrop={ e => onDragDrop(e,i)}
        className="card-flex-item">
        {i.id},{i.val}
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