import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.container}>
      <h1 className="text-4xl font-bold text-slate-50">BDev SPA Template</h1>
      <img src="/doge2.png" />
    </div>
  );
};
