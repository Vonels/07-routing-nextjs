interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p style={{ color: "red" }}>{message}</p>
);
export default ErrorMessage;
