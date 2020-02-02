
#define DEBUG

#define PLUGIN_NAME           "item_lognames"
#define PLUGIN_AUTHOR         ""
#define PLUGIN_DESCRIPTION    ""
#define PLUGIN_VERSION        "1.0"
#define PLUGIN_URL            ""

#include <sourcemod>
#include <sdktools>
#include <sdkhooks>

#pragma semicolon 1


public Plugin myinfo =
{
	name = PLUGIN_NAME,
	author = PLUGIN_AUTHOR,
	description = PLUGIN_DESCRIPTION,
	version = PLUGIN_VERSION,
	url = PLUGIN_URL
};

public void OnPluginStart()
{
	HookEvent("player_death", Event_PlayerDeath, EventHookMode_Pre);
}

public Action Event_PlayerDeath(Event event, const char[] name, bool dontBroadcast)
{
	int weaponID = event.GetInt("weaponid");
	int weapon_def_index = event.GetInt("weapon_def_index");
	char weapon[64];
	char weapon_logclassname[64];
	
	event.GetString("weapon", weapon, sizeof(weapon));
	event.GetString("weapon_logclassname", weapon_logclassname, sizeof(weapon_logclassname));
	
	LogToFile("item_lognames.txt", "weaponID: %d weapon_def_index: %d weapon: %s weapon_logclassname: %s", weaponID, weapon_def_index, weapon, weapon_logclassname);
	PrintToConsoleAll("weaponID: %d weapon_def_index: %d weapon: %s weapon_logclassname: %s", weaponID, weapon_def_index, weapon, weapon_logclassname);
	
	return Plugin_Continue;
}