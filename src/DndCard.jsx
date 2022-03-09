import React, {useRef,useContext} from 'react'

const DndContext = React.createContext()


export const useDndContext = () => { 
 return useContext(DndContext)
}

export const DndContainer = ({setCards,cards,children,...other}) => {
  return (
    <DndContext.Provider value={{cards,setCards}} >
    <div {...other}>
      {children}
    </div>
  </DndContext.Provider>)
}



export const DndCard = ({card,cardKey,children,...other}) => {

  const draggedCard = useRef(null)
  const {cards,setCards} = useDndContext();

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData("text/plain", cardKey);
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
  
  const onDragOver = (e) => {
    e.target.className+=' on-drag-over'
    e.preventDefault();
    //const temp = cardRef.current
    //cardRef.current = e.target
    //e.target = temp
  }
  
  const onDragLeave = (e) => {
    e.target.className='card-flex-item'
    e.preventDefault();
  }
  
  const onDragDrop = (e) => { 
    if(draggedCard.current)
      draggedCard.current.className='card-flex-item on-drag-over'
    e.target.className='card-flex-item'
    const fromCardKey = e.dataTransfer.getData("text/plain");
    ltr_renderDnd(fromCardKey,cardKey)
    e.preventDefault();

    //Tried to implement it all inside hook, but yields strange behavoir
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
  
  const ltr_renderDnd = (fromId,toId) => { 
    const fromIndex = cards.findIndex( i=> (i.id==fromId))
    const toIndex = cards.findIndex( i=> (i.id==toId))
    if ( fromIndex > toIndex) {
      //Tried to implement like this inside hook, but yields strange behavoir
      // setCards( prev => {
      //     prev.splice(toIndex,0, cards[fromIndex])
      //     prev.splice(fromIndex+1,1)
      //     return [...prev]
      // })
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

  return (
    <div {...other} draggable="true"
      onDragStart={e =>onDragStart(e)} 
      onDragOver= {e => onDragOver(e) } 
      onDragLeave={e => onDragLeave(e) }
      onDrop={ e => onDragDrop(e)}
      className="card-flex-item">
        {children}
    </div>
  )
}

