// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import SnackbarContent from "@mui/material/SnackbarContent";

// const action = (
//   <Button color="info" size="large">
//     lorem ipsum dolorem
//   </Button>
// );

// const UserPage = () => {
//   return (
//     <Stack
//       spacing={2}
//       sx={{ maxWidth: 600 }}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <SnackbarContent
//         message={` Welcome to Our Portfolio Project
//           Dear User! Your Path in Our Project:
//           Portfolio Owners: If you're looking to showcase your work, skills, and accomplishments, you're in the right place! Our platform empowers you to create a stunning portfolio that reflects your expertise. The possibilities are endless, and your portfolio will be a true reflection of your unique talents.

//           Clients and Visitors: For clients seeking top-notch professionals or anyone visiting our platform, we invite you to explore the incredible portfolios our users have created. You'll find a diverse range of skills, styles, and experiences to choose from, making it easy to find the perfect match for your needs.

//           If you're not a client but are eager to explore portfolios and experience the potential of our project, we kindly ask you to reach out to our admin team for more information. Our team is here to guide you and help you make the most of your journey with us. Feel free to contact us at abdulaziz_programmer@gmail.com Thank you for embarking on this exciting journey with us! We're dedicated to providing a platform that serves every user's portfolio needs and creates connections that lead to success.`}
//         action={action}
//       />
//     </Stack>
//   );
// };

// export default UserPage;

import "../css/user.css";

const UserPage = () => {
  return (
    <div className="back-not">
      <h1 className="userH">Welcome to Our Portfolio Project</h1>
      <p className="userP">
        <span className="userspan">Portfolio Owners:</span> If you're looking to
        showcase your work, skills, and accomplishments, you're in the right
        place! Our platform empowers you to create a stunning portfolio that
        reflects your expertise. The possibilities are endless, and your
        portfolio will be a true reflection of your unique talents.
      </p>
      <hr />
      <p className="userP">
        <span className="userspan">Clients and Visitors:</span> For clients
        seeking top-notch professionals or anyone visiting our platform, we
        invite you to explore the incredible portfolios our users have created.
        You'll find a diverse range of skills, styles, and experiences to choose
        from, making it easy to find the perfect match for your needs.
      </p>
      <hr />
      <p className="userP">
        If you're not a client but are eager to explore portfolios and
        experience the potential of our project, we kindly ask you to reach out
        to our admin team for more information. Our team is here to guide you
        and help you make the most of your journey with us. Feel free to contact
        us at <span className="userspan">abdulaziz_programmer@gmail.com</span>{" "}
        Thank you for embarking on this exciting journey with us! We're
        dedicated to providing a platform that serves every user's portfolio
        needs and creates connections that lead to success.
      </p>
      <div className="knopka">
        <button className="userButton">Contact with Admin</button>
        <button className="userButton">Go to login</button>
      </div>
    </div>
  );
};

export default UserPage;
