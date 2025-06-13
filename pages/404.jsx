// pages/404.js


const Custom404 = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column",minHeight:"60vh"}}>
      <h1>404 - Page Not Found</h1>
      <p className='my-3 text-center' style={{maxWidth:"40rem",lineHeight:"2rem"}}>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <a href="/">
        Go back to home
      </a>
    </div>
  );
};

export default Custom404;
