import classes from "./Background.module.css";

const Background = () => {
  return (
    <div className={classes.container}>
      <div className={classes.blobs}>
        <div className={classes.blob} />
        <div className={classes.blob} />
        <div className={classes.blob} />
      </div>
    </div>
  );
};

export default Background;
