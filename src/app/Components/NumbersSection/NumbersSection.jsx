import classes from "./NumbersSection.module.css";

const NumbersSection = () => {
  return (
    <section className={classes["_25-sub-section"]}>
      <div className={classes["_25-ecosystem-sec"]}>
        <div className={classes["_25-container"]}>
          <div className={classes["_25-ecosystem-infos-wrapper"]}>
            <div className={classes["_25-ecosystem-main-texts"]}>
              <h3 className={classes["id_h1"]}>Welcome from the Organizing Commitee</h3>
              <div className={classes["ecosystem-subtitle"]}>
                Dear colleagues, Welcome to the 11th International Maritime Science Conference – IMSC 2025. This year’s conference is organized by the University of Split, Faculty of Maritime Studies (Split, Croatia), co-organized by the University of Ljubljana, Faculty of Maritime Studies and
                Transport (Portorož, Slovenia), and other renowned institutions and supporting organizations. Considering the increasing challenges of globalization in shipping and the related maritime sector in terms of safe, digitalized, contemporary, and sustainable development, it is necessary
                to create an academic platform to discuss optimal scientific and engineering solutions to achieve the industry’s goals. The IMSC conference...
              </div>
            </div>
            <div className={classes["_25-ecosystem-slider-numbers"]}>
              <div className={`${classes["_25-ecosystem-slider-numbers-card"]} ${classes["_3"]}`}>
                <div className={`${classes["_25-ecosystem-slider-numbers-image-wrapper"]} ${classes["_3"]}`}>
                  <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66b3dd0c1c754444798f44f0_53665545765_02320cb14c_o.webp' loading='lazy' alt='' className={classes["_25-all-images-config-cover"]} />
                </div>
                <div className={`${classes["_25-ecosystem-slider-big-numbers-wrapper"]} ${classes["no-space"]}`}>
                  <div className={classes["id_os_xl"]}>146</div>
                  <div className={`${classes["id_body_xl"]} ${classes["ecosystem-subtitle"]}`}>Visitors</div>
                </div>
              </div>
              <div style={{ opacity: 1 }} className={classes["_25-ecosystem-slider-numbers-card"]}>
                <div className={classes["_25-ecosystem-slider-numbers-image-wrapper"]}>
                  <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66d618d67b4fb2ed8f9cf07f_53665129376_8f73855dc8_o.jpg' loading='lazy' alt='' className={classes["_25-all-images-config-cover"]} />
                </div>
                <div className={classes["_25-ecosystem-slider-big-numbers-wrapper"]}>
                  <div className={classes["id_os_display_2x"]}>53</div>
                  <div className={`${classes["id_body_xl"]} ${classes["ecosystem-subtitle"]}`}>Presentations</div>
                </div>
              </div>
              <div className={`${classes["_25-ecosystem-slider-numbers-card"]} ${classes["_2"]}`}>
                <div className={`${classes["_25-ecosystem-slider-numbers-image-wrapper"]} ${classes["_2"]}`}>
                  <img src='https://cdn.prod.website-files.com/624af9f94249ed49150fbfb0/66b3dd1b2f409c08922b4582_53664216342_146d4d295d_o.webp' loading='lazy' alt='' className={classes["_25-all-images-config-cover"]} />
                </div>
                <div className={`${classes["_25-ecosystem-slider-big-numbers-wrapper"]} ${classes["no-space"]}`}>
                  <div className={classes["id_os_xl"]}>72</div>
                  <div className={`${classes["id_body_xl"]} ${classes["ecosystem-subtitle"]}`}>Papers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
