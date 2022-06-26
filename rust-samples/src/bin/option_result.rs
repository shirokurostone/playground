// https://doc.rust-lang.org/std/option/enum.Option.html
// https://doc.rust-lang.org/std/result/enum.Result.html

fn main() {
    // unwrap
    let none: Option<i32> = None;
    let some: Option<i32> = Some(123);
    assert_eq!(123, some.unwrap());
    assert_eq!(123, none.unwrap_or(123));
    assert_eq!(123, none.unwrap_or_else(|| 123));

    // map
    assert_eq!(124, some.map(|v| v + 1).unwrap());
    assert_eq!(123, none.map_or(123, |v| v + 1));
    assert_eq!(123, none.map_or_else(|| 123, |v| v + 1));

    // or
    assert_eq!(Some(123), none.or(Some(123)));
    assert_eq!(Some(123), none.or_else(|| Some(123)));

    // ok
    assert_eq!(Ok(123), some.ok_or("err"));
    assert_eq!(Err("err"), none.ok_or("err"));
    assert_eq!(Err("err"), none.ok_or_else(|| "err"));

    // map
    let ok: Result<u32, &str> = Ok(123);
    let err: Result<u32, &str> = Err("err");
    assert_eq!(124, ok.map(|v| v + 1).unwrap());
    assert_eq!(3, err.map_err(|e| e.len()).unwrap_err());
    assert_eq!(123, err.map_or(123, |v| v + 1));
    assert_eq!(123, err.map_or_else(|_v| 123, |v| v + 1));
}
