const Tag = ({ text }: { text: string }) => {
    return (
        <div className="badge badge-secondary p-4 flex items-center justify-center cursor-pointer">
            <p>{text}</p>
        </div>
    )
}

export default Tag;