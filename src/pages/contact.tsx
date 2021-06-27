import { Heading } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/popover";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { Container } from "../components/Container";
import { ExtLink } from "../components/ExtLink";

interface ContactDetailsProps {
  type: string;
  value: string;
  href?: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ type, value, href, children }) => {
  return (
    <Tr>
      <Td>{type}</Td>
      <Td textAlign="right">
        <ExtLink plainbg href={href}>
          {value}
        </ExtLink>
        {children}
      </Td>
    </Tr>
  );
};

export const Contact: React.FC = () => {
  return (
    <Container w="100%" maxW="25rem" justifyContent="center">
      <Heading>Contact Us</Heading>
      <Table my="4">
        <Tbody>
          <ContactDetails type="Email" value="dev@cheemsco.in" href="mailto:dev@cheemsco.in" />
          <ContactDetails
            type="Reddit"
            value="u/kowasaur"
            href="https://www.reddit.com/user/kowasaur"
          ></ContactDetails>
          <Tr>
            <Td>Discord</Td>
            <Td textAlign="right">
              <Popover>
                <PopoverTrigger>
                  <div>
                    <ExtLink
                      plainbg
                      onClick={() => {
                        // TODO: Handle exceptions
                        navigator.clipboard?.writeText("kowasaur#2095");
                      }}
                    >
                      kowasaur#2095
                    </ExtLink>
                  </div>
                </PopoverTrigger>
                <PopoverContent w="10rem" position="relative" left="3rem">
                  <PopoverArrow />
                  <PopoverHeader textAlign="center">Copied!</PopoverHeader>
                </PopoverContent>
              </Popover>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export default Contact;
