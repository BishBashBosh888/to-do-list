const PageContainer = ({children}) =>{
    return(
        <div className="h-screen flex justify-center items-center bg-sky-200">
            {children}
        </div>
    );
};

export default PageContainer;