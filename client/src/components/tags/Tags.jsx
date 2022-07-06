import "./tags.css";

function TagsInput(props) {

    return (
        <div className="tags-input-container">
            { (props.tags).map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => props.removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={(e) => { props.handleKeyDown(e) }} type="text" className="tags-input" placeholder="Add tags ..." />
        </div>
    )
}

export default TagsInput