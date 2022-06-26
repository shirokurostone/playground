use std::ops::{Add, Mul, Neg};

#[derive(Debug)]
struct Point<T>
where
    T: Add<Output = T> + Neg<Output = T> + Mul<T, Output = T> + Copy,
{
    x: T,
    y: T,
}

impl<T> Add for Point<T>
where
    T: Add<Output = T> + Neg<Output = T> + Mul<T, Output = T> + Copy,
{
    type Output = Point<T>;

    fn add(self, other: Self) -> Self::Output {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

impl<T> Neg for Point<T>
where
    T: Add<Output = T> + Neg<Output = T> + Mul<T, Output = T> + Copy,
{
    type Output = Point<T>;

    fn neg(self) -> Self::Output {
        Self {
            x: -self.x,
            y: -self.y,
        }
    }
}

impl<T> Mul<T> for Point<T>
where
    T: Add<Output = T> + Neg<Output = T> + Mul<T, Output = T> + Copy,
{
    type Output = Point<T>;

    fn mul(self, other: T) -> Self::Output {
        Self {
            x: other * self.x,
            y: other * self.y,
        }
    }
}

fn main() {
    println!("{:?}", Point { x: 1, y: 2 } + Point { x: 3, y: 4 });
    println!("{:?}", -Point { x: 1, y: 2 });
    println!("{:?}", Point { x: 1, y: 2 } * 2);
}
