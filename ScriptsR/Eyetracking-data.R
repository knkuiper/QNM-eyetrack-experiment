library(xlsx)
library(ggplot2)
library(MASS)
library(dplyr)
library(magrittr)
library(viridis)

### Import all datasets ----------------------------

GazeClean1_1 <- read.xlsx("data/1A-1.xlsx", 1)
GazeClean1_2 <- read.xlsx("data/1A-2.xlsx", 1)
GazeClean2_1 <- read.xlsx("data/2B-1.xlsx", 1)
GazeClean2_2 <- read.xlsx("data/2B-2.xlsx", 1)
GazeClean3_1 <- read.xlsx("data/3A-1.xlsx", 1)
GazeClean3_2 <- read.xlsx("data/3A-2.xlsx", 1)
GazeClean4_1 <- read.xlsx("data/4B-1.xlsx", 1)
GazeClean4_2 <- read.xlsx("data/4B-2.xlsx", 1)
GazeClean5_1 <- read.xlsx("data/5A-1.xlsx", 1)
GazeClean5_2 <- read.xlsx("data/5A-2.xlsx", 1)
GazeClean6_1 <- read.xlsx("data/6B-1.xlsx", 1)
GazeClean6_2 <- read.xlsx("data/6B-2.xlsx", 1)
GazeClean7_1 <- read.xlsx("data/7A-1.xlsx", 1)
GazeClean7_2 <- read.xlsx("data/7A-2.xlsx", 1)
GazeClean8_1 <- read.xlsx("data/8B-1.xlsx", 1)
GazeClean8_2 <- read.xlsx("data/8B-2.xlsx", 1)
GazeClean9_1 <- read.xlsx("data/9A-1.xlsx", 1)
GazeClean9_2 <- read.xlsx("data/9A-2.xlsx", 1)
GazeClean10_1 <- read.xlsx("data/10B-1.xlsx", 1)
GazeClean10_2 <- read.xlsx("data/10B-2.xlsx", 1)
GazeClean11_1 <- read.xlsx("data/11A-1.xlsx", 1)
GazeClean11_2 <- read.xlsx("data/11A-2.xlsx", 1)
GazeClean12_1 <- read.xlsx("data/12B-1.xlsx", 1)
GazeClean12_2 <- read.xlsx("data/12B-2.xlsx", 1)
GazeClean13_1 <- read.xlsx("data/13A-1.xlsx", 1)
GazeClean13_2 <- read.xlsx("data/13A-2.xlsx", 1)
GazeClean14_1 <- read.xlsx("data/14B-1.xlsx", 1)
GazeClean14_2 <- read.xlsx("data/14B-2.xlsx", 1)

### Binding dataframes -----------------------------

## Groups A and B for both video parts

df_A1 <- rbind(GazeClean1_1, GazeClean3_1, GazeClean5_1, GazeClean7_1, GazeClean9_1, GazeClean11_1, GazeClean13_1)
df_A2 <- rbind(GazeClean1_2, GazeClean3_2, GazeClean5_2, GazeClean7_2, GazeClean9_2, GazeClean11_2, GazeClean13_2)
df_B1 <- rbind(GazeClean2_1, GazeClean4_1, GazeClean6_1, GazeClean8_1, GazeClean10_1, GazeClean12_1, GazeClean14_1)
df_B2 <- rbind(GazeClean2_2, GazeClean4_2, GazeClean6_2, GazeClean8_2, GazeClean10_2, GazeClean12_2, GazeClean14_2)

### Binding dataframes conditions ------------------

df_noSubs <- rbind(df_A1, df_B2)
df_subs <- rbind(df_A2, df_B1)

# Cleaning datasets ================================

### Condition 1 - no subtiltes

df_noSubs <- 
  df_noSubs %>%
  dplyr::filter(
    df_noSubs$GazeX.norm <= 1280, 
    df_noSubs$GazeX.norm >= 0,
    df_noSubs$GazeY.norm <= 720,
    df_noSubs$GazeY.norm >= 0)

### Condition 2 - subtiltes

df_subs <- 
  df_subs %>%
  dplyr::filter(
    df_subs$GazeX.norm <= 1280, 
    df_subs$GazeX.norm >= 0,
    df_subs$GazeY.norm <= 720,
    df_subs$GazeY.norm >= 0)

# Heatmaps ------------------------------------------------------------

### Condition 1 - no subtiltes

HeatmapNoSubs <- kde2d(df_noSubs$GazeX.norm, -df_noSubs$GazeY.norm, h=150, n=200)
filled.contour(HeatmapNoSubs, plot.title = title(main = "Condition 1 - Subtitles off", xlab = "Screen width", ylab = "Screen height"),)


#### Condition 2 - subtiltes

HeatmapSubs <- kde2d(df_subs$GazeX.norm, -df_subs$GazeY.norm, h=150, n=200)
filled.contour(HeatmapSubs, plot.title = title(main = "Condition 2 - subtitles on", xlab = "Screen width", ylab = "Screen height"),)


# Boxplot of AOI ------------------------------------------------------

AOIc1noSubs <- read.xlsx("data/AOICondition1-SubtitlesOff.xlsx", 1)
AOIc2subs <- read.xlsx("data/AOICondition2-SubtitlesOn.xlsx", 1)

AOIboth <- read.xlsx("data/AOI-Data-results.xlsx", 1)

boxplot <- ggplot(AOIboth, aes(x = Condition, y = AOI, fill = Condition)) + 
  geom_boxplot() +
  xlab("Condition") + ylab("AOI") +
  #scale_fill_viridis_d()+
  theme_minimal()

boxplot
