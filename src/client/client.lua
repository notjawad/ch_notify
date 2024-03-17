local Notify = {
    isLoaded = false
}

Citizen.CreateThread(function()
    while not NetworkIsPlayerActive(PlayerId()) do
        Citizen.Wait(5000) -- Wait for the player to be active
    end

    Citizen.Wait(2000)
    SendNUIMessage({
        message = 'setData',
        data = Config
    })

    Notify.isLoaded = true
    print('ch_notify has been loaded.')
end)

function Notify:new(data)
    if not self.isLoaded then return end
    SendNUIMessage({
        message = 'createNotification',
        data = {
            message = data.message or 'No message provided',
            title = data.title or 'Notification',
            type = data.type or 'info',
            duration = data.duration or 4000,
            icon = data.icon or 'bx bxs-info-circle',
            color = data.color or '#e4e4e7'
        }
    })
end

RegisterNetEvent('ch_notify:sendNotification') -- Event handler for notifications.
AddEventHandler('ch_notify:sendNotification', function(data) Notify:new(data) end)

exports('sendNotification', function(data) Notify:new(data) end)

RegisterCommand('ch_test_notify', function()

    local notifications = {
        {
            message = 'You\'ve worked some time off your sentence.',
            title = 'Prison',
            duration = 4000,
            icon = 'bx bxs-time-five',
            color = '#12b981'
        },
        {
            message = 'You are bleeding, a lot...',
            title = 'Health',
            duration = 4000,
            icon = 'bx bx-plus-medical',
            color = '#f43f5f'
        },
        {
            message = 'You need to be closer to the delivery point',
            title = 'Trucker Job',
            duration = 4000,
            icon = 'bx bxs-truck',
            color = '#f43f5f'
        },
        {
            message = 'This is another notification',
            title = 'Notification',
            duration = 4000,
            icon = 'bx bxs-info-circle',
            color = '#e4e4e7'
        }
    }

    for _, notification in ipairs(notifications) do
        Notify:new(notification)
    end
end)