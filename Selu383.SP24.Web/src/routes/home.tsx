import Header from "../elements/NavigationBar.tsx"
import Footer from "../elements/footer.tsx"
function Home() {
    return (
        <>
        <Header/>
        <img src="Enstay-Hotel1.jpg" alt="Nice exterior of hotel" className="center-picture"></img>
            <p className='p1'>Welcome to Enstay, your home away from home!</p>
            <br></br>
            <p> Come stay at one of Enstay's many hospitable hotels so while you go on a fantastic vacation, 
                you can have the peace of mind knowing you have somewhere to rest and recharge to get
                back out there and have fun!
            </p>
        <Footer/>
        </>
    )
}

export default Home