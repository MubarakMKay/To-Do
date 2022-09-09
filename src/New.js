const New = (props) => {
    return ( 
        <div className="newItemText">
            <form action="">
                <input 
                    className="newItemTextBody" 
                    type="text" 
                    name='body' 
                    value= {props.newToDo.body}
                    onChange={props.handleNew}
                    required
                />
                <input className="newItemSubmit" type="submit" value='Add' onClick={props.addToDo}/>
            </form>
        </div>
     );
}
 
export default New;