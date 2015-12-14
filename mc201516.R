figures <- list(
strsplit("   -=-
(\\  _  /)
( \\( )/ )
(       )
 `>   <´
 /     \\
 `-._.-'
", "\n")[[1]],
strsplit("   -=-
(\\  _  /)
( \\( )/ ) MERRY CHRISTMAS &
(       )       HAPPY NEW YEAR
 `>   <´      by C.
 /     \\
 `-._.-'
", "\n")[[1]],
strsplit("  ,\"\"\"-,
 /,.____\\
() {_____}
  (/ . . \\)
  {`-=^=-`}
  {   `   }
   {     }
    `-,-
", "\n")[[1]],
strsplit("  ,\"\"\"-,
 /,.____\\
() {_____}     HO HO HO!
  (/ . . \\)     MERRY CHRISTMAS
  {`-=^=-`}        by C.
  {   `   }
   {     }
    `-,-
", "\n")[[1]]
)

sel <- sample(c(1, 3), 1)
top <- 25
sec <- 2

clc <- function(n=50) cat(rep("\n",n))
bk <- function(n=10) paste0(rep(" ", n), collapse="")
for(jj in 1:length(figures[[sel]])) {
  clc()
  for(ii in 1:jj) { cat(bk(), paste0(figures[[sel]][ii], "\n")) }
  clc(top-jj)
  Sys.sleep(sec)
}

clc()
for(ii in figures[[sel+1]]) { cat(bk(), paste0(ii, "\n")) }
clc(top-length(figures[[sel+1]]))



