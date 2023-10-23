
--[[
    + Modo de usar (EVENT)
    + x, y = Posição na tela em % ex. 50%, 50% centralizado
    + scale = Tamanho na tela ex. 1.0 tamanho original
    + Callback = Define se o minigame deu sucesso ou falhou
        'sucess' or 'failed'

    TriggerEvent("mxStartLockpickGame", x, y, scale, function(Callback)
        if Callback == 'sucess' then
            print(">> Lockpick: [ Success ]")
        elseif Callback == 'failed' then
            print(">> Lockpick: [ Failed ]")
        end
    end)
]]

CallBackFunction = nil

RegisterCommand('startlockpick', function(src, args, cmd) 
    TriggerEvent("mxStartLockpickGame", args[1], args[2], args[3], function(Callback)
        if Callback == 'sucess' then
            print(">> Lockpick: [ Success ]")
        elseif Callback == 'failed' then
            print(">> Lockpick: [ Failed ]")
        end
    end)
end, false)

RegisterNetEvent('mxStartLockpickGame')
AddEventHandler('mxStartLockpickGame', function(x, y, scale, Callback)
    LockpickGame(x, y, scale, Callback)
end)

function LockpickGame(x, y, scale, Callback)
    SetNuiFocus(true,true)
    SendNUIMessage({
        ui = 'ui',
        NuiOpen = true,
        x = x,
        y = y,
        scale = scale,
        NameResource = GetCurrentResourceName(),
    })
    CallBackFunction = Callback
end

RegisterNUICallback('sucess', function(data, cb)
    if CallBackFunction then
        CallBackFunction('sucess')
    end
    SetNuiFocus(false, false)
    SendNUIMessage({
        ui = 'ui',
        NameResource = GetCurrentResourceName(),
        NuiOpen = false,
    })
    cb('ok')
end)

RegisterNUICallback('CloseNui', function(data, cb)
    if CallBackFunction then
        CallBackFunction('failed')
    end

    local ped = PlayerPedId()
    ClearPedTasks(ped)

    SetNuiFocus(false, false)
    SendNUIMessage({
        ui = 'ui',
        NameResource = GetCurrentResourceName(),
        NuiOpen = false,
    })
    cb('ok')
end)
