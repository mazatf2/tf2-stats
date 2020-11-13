export const logApiRE = {}

logApiRE.build = function (identifier, reString, callback){
	logApiRE[identifier] = new RegExp(reString)
	return logApiRE[identifier].source
}
const build = logApiRE.build

//normal regular expression with / = no escaping needed
//string literal regexp building = needs \/ escaping

const dateRe = build('dateRe', /L (?<month>\d+)\/(?<day>\d+)\/(?<year>\d+) - (?<hour>\d+):(?<minute>\d+):(?<second>\d+):/)

const playerRe = build('playerRe', /"(?<player_nick>.+)<(?<player_uid>\d+)><(?<player_steamid>(\[\S+\]|STEAM_\S+))><(?<player_team>Red|Blue|Unassigned|)>"/)
const targetRe = build('targetRe', /"(?<target_nick>.+)<(?<target_uid>\d+)><(?<target_steamid>(\[\S+\]|STEAM_\S+))><(?<target_team>Red|Blue|Unassigned|)>"/)

const weaponRe = build('weaponRe', /\(weapon "(?<weapon>[^"]+)"\)/)
const healingRe = build('healingRe', /\(healing "(?<healing>\w+)"\)/)
const realdamageRe = build('realdamageRe', /\(realdamage "(?<realdamage>\w+)"\)/)
const damageRe = build('damageRe', /\(damage "(?<damage>\w+)"\)/)
const airshotRe = build('airshotRe', /\(airshot "(?<airshot>\w+)"\)/)

//L 06/30/2017 - 20:41:46: "maza<75><[U:1:115277914]><Red>" spawned as "Soldier"
const player_spawned = build('player_spawned', new RegExp(`${dateRe} ${playerRe} spawned as "(?<class>.+)"`))

//crater
//L 01/17/2018 - 21:12:26: "jöö<8><[U:1:115277914]><Red>" committed suicide with "world" (attacker_position "5046 -953 296")

//headshot
//L 02/23/2018 - 11:32:38: "D3rKeiZ<17><[U:1:144190081]><Red>" triggered "damage" against "Scorpion<8><[U:1:163791764]><Blue>" (damage "150") (weapon "sniperrifle") (healing "88") (headshot "1")


//headshot + assist + machina custom kill
//headshot + normal sniperrifle custom kill
//L 01/17/2018 - 21:28:34: "fuck fame<12><[U:1:86024717]><Blue>" killed "nad<3><[U:1:124219016]><Red>" with "machina" (customkill "headshot") (attacker_position "851 -1427 256") (victim_position "854 393 307")
//L 01/17/2018 - 21:28:34: "rip<16><[U:1:232700427]><Blue>" triggered "kill assist" against "nad<3><[U:1:124219016]><Red>" (assister_position "655 -525 261") (attacker_position "851 -1427 256") (victim_position "854 393 307")
//L 01/17/2018 - 21:28:34: "fuck fame<12><[U:1:86024717]><Blue>" triggered "damage" against "nad<3><[U:1:124219016]><Red>" (damage "518") (realdamage "104") (weapon "machina") (headshot "1")
//7L 01/17/2018 - 21:19:59: "fuck fame<12><[U:1:86024717]><Blue>" killed "nad<3><[U:1:124219016]><Red>" with "sniperrifle" (customkill "headshot") (attacker_position "-1813 42 360") (victim_position "-2963 694 296")

//killed with airshot + healing + realdamage + etc
//killed and damage log lines out off sync
//L 02/23/2018 - 11:15:16: "Scorpion<8><[U:1:163791764]><Blue>" killed "Sapsan<6><[U:1:73680596]><Red>" with "tf_projectile_rocket" (attacker_position "-1191 -2401 256") (victim_position "-1374 -2145 272")
//L 02/23/2018 - 11:15:16: "Scorpion<8><[U:1:163791764]><Blue>" triggered "damage" against "Sapsan<6><[U:1:73680596]><Red>" (damage "81") (realdamage "46") (weapon "tf_projectile_rocket") (airshot "1")


//airshot kill
//L 02/23/2018 - 11:08:03: "Scorpion<8><[U:1:163791764]><Blue>" killed "El jmpo<11><[U:1:208017558]><Red>" with "tf_projectile_rocket" (attacker_position "-1237 -175 552") (victim_position "-687 138 635")
//L 02/23/2018 - 11:08:03: "Scorpion<8><[U:1:163791764]><Blue>" triggered "damage" against "El jmpo<11><[U:1:208017558]><Red>" (damage "37") (realdamage "33") (weapon "tf_projectile_rocket") (airshot "1")

//L 02/23/2018 - 11:04:13: "scattergun<4><[U:1:106547360]><Blue>" triggered "damage" against "El jmpo<11><[U:1:208017558]><Red>" (damage "100") (weapon "iron_bomber") (airshot "1")

//medic healing, airshot
//L 02/23/2018 - 11:08:56: "macho<7><[U:1:11374573]><Blue>" triggered "damage" against "ᵒLᵒ<10><[U:1:232775546]><Red>" (damage "84") (weapon "tf_projectile_rocket") (healing "88") (airshot "1")

//var damage_trigger = build(new RegExp(`${dateRe} ${playerRe} triggered "damage" against ${targetRe} (?<trigger_attributes>.+)`), 'damage_trigger',0, damage_trigger_atributes)

const damage_trigger = build('damage_trigger', `${dateRe} ${playerRe} triggered "damage" against ${targetRe} (?<trigger_attributes>.+)`)

const weaponRe_TODO = build('weaponRe', /"(?<weaponRe_TODO>[^"]+)"/)

// (customkill "headshot") (attacker_position "-640 1163 108") (victim_position "-123 1255 140")
//L 06/30/2017 - 20:33:31: "maza<75><[U:1:115277914]><Red>" killed "jeszcze nie dead until 15.07.<82><[U:1:127171744]><Blue>" with "quake_rl" (attacker_position "-1903 530 -415") (victim_position "-1839 1092 -415")
const killed = build('killed', `${dateRe} ${playerRe} killed ${targetRe} with ${weaponRe_TODO} (?<trigger_attributes>.+)`) //Todo weapon needs ""

//L 02/24/2019 - 20:49:18: "HEMSTRAND<4><[U:1:85127652]><Blue>" triggered "medic_death" against "BaBitY BAap BOOB<11><[U:1:81019374]><Red>" (healing "6026") (ubercharge "1")
//L 02/24/2019 - 21:05:49: "WRITHER<15><[U:1:44258288]><Red>" triggered "medic_death" against "Turo<16><[U:1:33312144]><Blue>" (healing "1011") (ubercharge "0")
const medic_death = build('medic_death', `${dateRe} ${playerRe} triggered "medic_death" against ${targetRe} \\(healing "(?<healing>\\d+)"\\) \\(ubercharge "(?<ubercharge>\\d+)"\\)`)

//https://github.com/alevoska/logstf-spec
//L 02/24/2019 - 20:49:18: "BaBitY BAap BOOB<11><[U:1:81019374]><Red>" triggered "medic_death_ex" (uberpct "100")
const medic_death_ex = build('medic_death_ex', `${dateRe} ${playerRe} triggered "medic_death_ex" \\(uberpct "(?<uberpct>\\d+)"\\)`)

//L 06/07/2018 - 20:31:59: Team "Red" final score "3" with "6" players
//L 06/07/2018 - 20:31:59: Team "Blue" final score "3" with "6" players
const score_final = build('score_final', `${dateRe} Team "(?<team>\\w+)" final score "(?<score>\\d+)" with "(?<player_count>\\d+)" players`) //Todo check if team can be custom
//L 06/07/2018 - 20:31:49: World triggered "Round_Stalemate"
//L 06/07/2018 - 20:31:49: Team "Red" current score "3" with "6" players
//L 06/07/2018 - 20:31:49: Team "Blue" current score "3" with "6" players
const score_current = build('score_current', `${dateRe} Team "(?<team>\\w+)" current score "(?<score>\\d+)" with "(?<player_count>\\d+)" players`) //Todo check if team can be custom

//L 06/30/2017 - 20:38:24: Tournament mode started
const tournament_mode_start = build('tournament_mode_start', `${dateRe} Tournament mode started`)
//L 06/07/2018 - 20:31:59: World triggered "Game_Over" reason "Reached Time Limit"
const game_over = build('game_over', `${dateRe} World triggered "Game_Over" reason "`) //TODO capture reason

//L 06/30/2017 - 20:38:24: World triggered "Round_Start"
const round_start = build('round_start', `${dateRe} World triggered "Round_Start"`)
//L 06/30/2017 - 20:41:36: World triggered "Round_Win" (winner "Blue")
const round_win = build('round_win', `${dateRe} World triggered "Round_Win" \\(winner "(?<winner>Red|Blue)"\\)`)
//L 06/07/2018 - 20:31:49: World triggered "Round_Stalemate"
const round_stalemate = build('round_stalemate', `${dateRe} World triggered "Round_Stalemate`)
//L 06/30/2017 - 20:41:36: World triggered "Round_Length" (seconds "149.74")
const round_length = build('round_length', `${dateRe} World triggered "Round_Length" \\(seconds "(?<round_length>.+)"\\)`)

//L 02/27/2018 - 21:10:34: Log file started (file "logs/L0227009.log") (game "/home/arie/tf2-22/tf") (version "4294355")
const log_file_started = build('log_file_started', `${dateRe} Log file started \\(file "`)