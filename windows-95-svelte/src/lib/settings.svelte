<!-- SettingsPanel.svelte -->
<script lang="ts">
	interface Props {
		theme?: string;
		username?: string;
	}

	let { theme = 'light', username = 'User' }: Props = $props();

	let selectedTheme = $state(theme);
	let notifications = $state(true);
	let autoSave = $state(false);
</script>

<div class="settings-panel">
	<h3>Settings</h3>

	<div class="setting-group">
		<label for="username">Username:</label>
		<input id="username" type="text" value={username} readonly />
	</div>

	<div class="setting-group">
		<label for="theme">Theme:</label>
		<select id="theme" bind:value={selectedTheme}>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="auto">Auto</option>
		</select>
	</div>

	<div class="setting-group">
		<label>
			<input type="checkbox" bind:checked={notifications} />
			Enable notifications
		</label>
	</div>

	<div class="setting-group">
		<label>
			<input type="checkbox" bind:checked={autoSave} />
			Auto-save documents
		</label>
	</div>

	<button class="save-btn">Save Settings</button>
</div>

<style>
	.settings-panel {
		padding: 0;
	}

	h3 {
		margin: 0 0 16px 0;
		color: #374151;
	}

	.setting-group {
		margin-bottom: 16px;
	}

	label {
		display: block;
		margin-bottom: 4px;
		font-weight: 500;
		color: #374151;
	}

	input[type='text'],
	select {
		width: 100%;
		padding: 8px;
		border: 1px solid #d1d5db;
		border-radius: 4px;
		font-size: 14px;
	}

	input[type='checkbox'] {
		margin-right: 8px;
	}

	.save-btn {
		background: #10b981;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		width: 100%;
	}

	.save-btn:hover {
		background: #059669;
	}
</style>
