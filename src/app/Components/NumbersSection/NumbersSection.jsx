import classes from "./NumbersSection.module.css";

const NumbersSection = () => {
  return (
    <section className={classes.section}>
      <div className={classes.wrapper}>
        <div className={classes.text}>
          <h3 className={classes.title}>Welcome from the Organizing Commitee</h3>
          <div className={classes.subtitle}>
            Dear colleagues, Welcome to the 11th International Maritime Science Conference – IMSC 2025. This year’s conference is organized by the University of Split, Faculty of Maritime Studies (Split, Croatia), co-organized by the University of Ljubljana, Faculty of Maritime Studies and Transport
            (Portorož, Slovenia), and other renowned institutions and supporting organizations. Considering the increasing challenges of globalization in shipping and the related maritime sector in terms of safe, digitalized, contemporary, and sustainable development, it is necessary to create an
            academic platform to discuss optimal scientific and engineering solutions to achieve the industry’s goals. The IMSC conference...
          </div>
        </div>
        <div className={classes.numbers}>
          <div className={`${classes.card} ${classes.three}`}>
            <div className={`${classes.imageWrapper} ${classes.three}`}>
              <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66b3dd0c1c754444798f44f0_53665545765_02320cb14c_o.webp' loading='lazy' alt='' className={classes.cover} />
            </div>
            <div className={`${classes.bigNumbers} ${classes.noSpace}`}>
              <div className={classes.large}>146</div>
              <div className={classes.numbersSubtitle}>Visitors</div>
            </div>
          </div>
          <div style={{ opacity: 1 }} className={classes.card}>
            <div className={classes.imageWrapper}>
              <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66d618d67b4fb2ed8f9cf07f_53665129376_8f73855dc8_o.jpg' loading='lazy' alt='' className={classes.cover} />
            </div>
            <div className={classes.bigNumbers}>
              <div className={classes.extraLarge}>53</div>
              <div className={classes.numbersSubtitle}>Presentations</div>
            </div>
          </div>
          <div className={`${classes.card} ${classes.two}`}>
            <div className={`${classes.imageWrapper} ${classes.two}`}>
              <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66b3dd1b2f409c08922b4582_53664216342_146d4d295d_o.webp' loading='lazy' alt='' className={classes.cover} />
            </div>
            <div className={`${classes.bigNumbers} ${classes.noSpace}`}>
              <div className={classes.large}>72</div>
              <div className={classes.numbersSubtitle}>Papers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
