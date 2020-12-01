import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Grid.module.scss';

const gridArr: number[][] = [];
let countX = -1;
let countY = 0;

for (let i = 0; i < 400; i++) {
  if (countX === 19) {
    countY += 1;
  }
  if (countX === 19) {
    countX = -1;
  }
  gridArr.push([(countX += 1), countY]);
}

console.log(gridArr);

interface Props {
  tail: number[][];
  position: number[];
  apple: number[];
}

const Grid: FC<Props> = ({ apple, tail, position }) => {
  return (
    <>
      <div className={styles.grid}></div>
      <div className={styles.unitWrapper}>
        {gridArr.map((unit, i) => {
          return (
            <div
              className={cx(
                styles.unit,
                JSON.stringify(unit) === JSON.stringify(position) &&
                  styles.active,
                JSON.stringify(tail).includes(JSON.stringify(unit)) &&
                  styles.tail,
                JSON.stringify(apple).includes(JSON.stringify(unit)) &&
                  styles.apple,
              )}
              key={`${i}`}
            ></div>
          );
        })}
      </div>
    </>
  );
};
export default Grid;
