const Footer = () => {
    return(
        <div className="bg-blue-800 py-10" >
            <div className="container flex mx-auto justify-between items-center">
                <span className="text-white text-3xl tracking-tight font-bold">
                    EnjoyHolidays.com
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer"> Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;