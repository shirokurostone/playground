fn main() {
    // if
    let num = 3;
    if num == 1 {
        println!("num is 1")
    } else if num == 2 {
        println!("num is 2")
    } else {
        println!("num is other")
    }

    let opt = Some(123);
    if let Some(v) = opt {
        println!("Some({})", v)
    }

    // match
    let a: [Result<i32, &str>; 2] = [Ok(123), Err("err")];
    for result in &a {
        match result {
            Ok(t) => {
                println!("Ok({:?})", t);
            }
            Err(e) => {
                println!("Err({:?})", e);
            }
        }
    }

    // loop
    let mut i = 0;
    loop {
        println!("loop : {:?}", i);
        i += 1;
        if i > 10 {
            break;
        }
    }

    // while
    let mut j = 0;
    while j < 10 {
        println!("while : {:?}", j);
        j += 1;
    }

    // for
    for k in 0..10 {
        println!("for(Range) : {:?}", k);
    }

    let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for l in a.iter() {
        println!("for(Iterator) : {:?}", l);
    }
}
