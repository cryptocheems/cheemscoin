import { Box, Heading } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/popover";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
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
    <Box mt="10" textAlign="center" w="100%" p="2" maxW="25rem" h="100%">
      <Heading>Contact Us</Heading>
      <Table mt="4">
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
                <PopoverContent w="10rem" position="relative" left="7rem">
                  <PopoverArrow />
                  <PopoverHeader textAlign="center">Copied!</PopoverHeader>
                </PopoverContent>
              </Popover>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Contact;
