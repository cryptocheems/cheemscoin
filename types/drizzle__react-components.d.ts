// TODO: Make everything more specific
declare module "@drizzle/react-components" {
  import { ReactElement, Component } from "react";

  // TODO: Make these not any
  interface newContextProps {
    drizzle: any;
    drizzleState: any;
  }

  interface newAccountDataProps extends newContextProps {
    accountIndex: number;
    units?: string;
    precision?: number;
  }

  interface contractProps extends newContextProps {
    contract: string;
    method: string;
  }

  interface newContractDataProps extends contractProps {
    methodArgs?: [];
    hideIndicator?: boolean;
    toUtf8?: boolean;
    toAscii?: boolean;
    render?: (value) => ReactElement;
  }

  interface newContractFormProps extends contractProps {
    sendArgs?: {
      from: string;
      gasPrice?: string;
      gas?: number;
      value?: number | string | bigint;
    };
    labels?: string[];
    render?: (args: {
      handleInputChange: Function;
      handleSubmit: Function;
      inputTypes: string[];
      inputs: { internalType: string; name: string; type: string }[];
      state: object;
    }) => ReactElement;
  }

  export const newContextComponents = {
    AccountData: class NewAccountData extends Component<newAccountDataProps> {},
    ContractData: class NewContractData extends Component<newContractDataProps> {},
    ContractForm: class NewContractForm extends Component<newContractFormProps> {},
  };
}
