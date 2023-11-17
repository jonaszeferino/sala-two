import styles from "../styles/Footer.module.css"
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { ChakraProvider, Box, Text, Center } from "@chakra-ui/react";


const SocialLinks = () => {
 
  return (
    <footer className={styles.footer}>
      <ChakraProvider>
        <Box pt="72px" p="20px">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="https://twitter.com/Saladesecacao"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "50px", padding: "20px" }}
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.youtube.com/@SaladeSecacao"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "50px", padding: "20px" }}
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/saladesecacao/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "50px", padding: "20px" }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@saladeseca?lang=pt-BR"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "50px", padding: "20px" }}
            >
              <FaTiktok />
            </a>
          </div>
        </Box>
      </ChakraProvider>
    </footer>
  );
}


export default SocialLinks;



