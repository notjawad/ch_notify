<p align="center">
  <img src="https://files.catbox.moe/hjkx60.png" alt="preview">
</p>

---

## Usage

Icons can be found here https://boxicons.com/

```lua
exports['ch_notify']:sendNotification({
    title = 'Promotion',
    description = 'You have been promoted to ' .. data.gradename .. '.',
    icon = 'bx bxs-upvote',
    duration = 5000,
    color = '#14b8a6'
})
```

or

```lua
TriggerClientEvent('ch_notify:sendNotification', source, {
    title = 'Admin Menu',
    message = 'Not a valid job',
    icon = 'bx bxs-error-circle',
    color = '#f43f5f',
    duration = 5000
})
```
