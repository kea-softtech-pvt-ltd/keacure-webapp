const MainNav = (props) =>{
    return(
        <nav id="secondary_nav">
            <div className="container">
                <span>{props.children}</span>
            </div>
        </nav>
    )
}
export {MainNav}