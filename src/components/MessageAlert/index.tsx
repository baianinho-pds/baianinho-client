import styles from "./messageAlert.module.css";

interface MessageAlertProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export default function MessageAlert({
  isOpen,
  onRequestClose,
}: MessageAlertProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.card}>
            <p>Operação realizada com sucesso!</p>
            <button onClick={() => onRequestClose()}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
