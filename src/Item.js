import checked from './Images/checked.svg'
import unchecked from './Images/unchecked.svg'
import bin from './Images/bin.svg'

const Item = (props) => {
    let body = props.body
    let id = props.id
    let img = props.done ? checked : unchecked
    let style = props.done ? {textDecoration: 'line-through'} : {textDecoration: 'none'}
    
    return (
        <div className="listItem" onMouseEnter={props.showDelete} onMouseLeave={props.hideDelete}>
            <div className="listItemCheckAndText">
                <img 
                    src= {img}
                    alt="checkedStatus"
                    className="check"
                    onClick={props.handleClick}
                />
                <input 
                    type="text" 
                    name='body' 
                    id= { id }
                    className="listItemTextBody" 
                    value= {body}
                    onChange={props.handleChange}
                    style={style}
                />
            </div>
            <div className="listItemSaveAndDelete">
                {props.reOrder && <input className="listItemReOrder" type="submit" value='Save' onClick={props.handleSave}/>}
                {props.deletee && <img src={bin} alt="delete" className="delete" onClick={props.handleDelete}/>}
            </div>
        </div>
     );
}
 
export default Item;