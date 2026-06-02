using AutoSchoolAdminArm.Data;
using AutoSchoolAdminArm.Services;
using Microsoft.EntityFrameworkCore;
using System.Windows;

namespace AutoSchoolAdminArm;

public partial class App : Application
{
    protected override async void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        ShutdownMode = ShutdownMode.OnExplicitShutdown;

        var db = new AppDbContext();
        try
        {
            await db.Database.EnsureCreatedAsync();
            // Verify schema is current by checking for TheoryGroups table
            _ = await db.TheoryGroups.CountAsync();
        }
        catch
        {
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();
        }
        await DataSeeder.SeedAsync(db);

        var authService = new AuthService(db);
        var loginWindow = new LoginWindow(authService);
        var loginOk = loginWindow.ShowDialog();

        if (loginOk == true)
        {
            var main = new MainWindow(db);
            MainWindow = main;
            ShutdownMode = ShutdownMode.OnMainWindowClose;
            main.Show();
            return;
        }

        Shutdown();
    }
}
