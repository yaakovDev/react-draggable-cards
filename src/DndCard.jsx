import React, {useRef,useContext, useState} from 'react'

const DndContext = React.createContext()

export const useDndContext = () => { 
 return useContext(DndContext)
}

//DndContainer DndContainer DndContainer DndContainer DndContainer 
export const DndContainer = ({setCards,cards,children,...other}) => {
  return (
    <DndContext.Provider value={{cards,setCards}} >
    <div style={{overflow:"auto"}} {...other}>
      {children}
    </div>
  </DndContext.Provider>)
}


//DndCard DndCard DndCard DndCard DndCard DndCard DndCard DndCard 
export const DndCard = ({card,cardKey,children,...other}) => {

  const draggedCard = useRef(null)
  const {cards,setCards} = useDndContext();
  const [ originalClassName,setOriginalClassName] = useState(null)

  const onDragStart = (e) => {  
    if(!originalClassName)
      setOriginalClassName(e.target.className)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData("text/plain", cardKey);
    // if (draggedCard.current)
    //   draggedCard.current.className='card-flex-item'
    draggedCard.current = e.target
    // e.target.className='card-flex-item on-drag-over'
    // setTimeout(() => e.target.className='card-flex-item', 0)
    // e.preventDefault();
    //hide dragging silhouette
    // var img = document.createElement("div"); 
    // e.dataTransfer.setDragImage(img, 0, 0);    
  }
  
  const onDragOver = (e) => {
    if ( !originalClassName) 
      setOriginalClassName(e.target.className)
    if ( !e.target.className.includes('on-drag-over') && originalClassName)
      e.target.className=`${originalClassName} on-drag-over`
    e.preventDefault();
    //const temp = cardRef.current
    //cardRef.current = e.target
    //e.target = temp
  }
  
  const onDragLeave = (e) => {
    if ( !e.target.className.includes('on-drag-leave') && originalClassName) 
      e.target.className=`${originalClassName} on-drag-leave`
    e.preventDefault();
  }
  
  const onDragDrop = (e) => {
    if(draggedCard.current)
      draggedCard.current.className=originalClassName;//'card-flex-item on-drag-over'
    e.target.className=originalClassName;//'card-flex-item'
    setOriginalClassName('')
    const fromCardKey = e.dataTransfer.getData("text/plain");
    ltr_renderDnd(fromCardKey,cardKey)
    // e.preventDefault();
  }  
  
  const ltr_renderDnd = (fromId,toId) => { 
    const fromIndex = cards.findIndex( i=> (i.key==fromId))
    const toIndex = cards.findIndex( i=> (i.key==toId))
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


