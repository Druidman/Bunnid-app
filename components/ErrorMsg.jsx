const ErrorMsg = (data) => {
    return (
        <div>
            <h1 className="title">Error!</h1>
            <h1 className="subtitle">{data}</h1>
        </div>
        
    )
}
export default ErrorMsg;