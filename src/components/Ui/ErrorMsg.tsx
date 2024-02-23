interface IErrorMsgProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IErrorMsgProps) => {
  return msg ? <span className={`text-red-500 text-sm`}>{msg}</span> : null;
};

export default ErrorMsg;
