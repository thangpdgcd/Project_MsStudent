package com.example.hikeapplication.Observation;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.ContentValues;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.R;

import java.util.Calendar;

public class AddObservationsActivity extends AppCompatActivity {

    private EditText observation, dateObservation, comment;
    private Button dateTimeButton, createObservation;
    private DatePickerDialog datePickerDialog;
    private TimePickerDialog timePickerDialog;
    private int hike_id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_observations);

        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setDisplayHomeAsUpEnabled(true);
            ab.setTitle("Add Observation");
        }

        observation = findViewById(R.id.observation);
        dateObservation = findViewById(R.id.dateObservation);
        comment = findViewById(R.id.comment);
        dateTimeButton = findViewById(R.id.dateTimeButton);
        createObservation = findViewById(R.id.createObservation);

        // ===== GET hike_id (INT) =====
        Intent intent = getIntent();
        hike_id = intent.getIntExtra("hike_id", -1);
        if (hike_id == -1) {
            Toast.makeText(this, "Hike ID not found!", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        // DATE PICKER
        initDatePicker();
        dateObservation.setText(getTodayDate());
        dateTimeButton.setOnClickListener(v -> datePickerDialog.show());

        // CREATE OBSERVATION
        createObservation.setOnClickListener(v -> saveObservation());
    }

    private void saveObservation() {
        String nameObservation = observation.getText().toString().trim();
        String dateObs = dateObservation.getText().toString().trim();
        String commentObs = comment.getText().toString().trim();

        if (nameObservation.isEmpty() || dateObs.isEmpty() || commentObs.isEmpty()) {
            new AlertDialog.Builder(this)
                    .setTitle("Error")
                    .setMessage("All fields required!")
                    .setPositiveButton("OK", null)
                    .show();
        } else {
            ContentValues values = new ContentValues();
            values.put("hike_id", hike_id);
            values.put("observation", nameObservation);
            values.put("date", dateObs);
            values.put("comment", commentObs);

            new AlertDialog.Builder(this)
                    .setTitle("Confirmation")
                    .setMessage("Add new observation?")
                    .setPositiveButton("OK", (dialog, which) -> {
                        ConnectDb db = new ConnectDb(this);
                        db.addObservation(nameObservation, hike_id, dateObs, commentObs);

                        Intent intent = new Intent(
                                AddObservationsActivity.this,
                                ObservationsActivity.class
                        );
                        intent.putExtra("hike_id", hike_id);   // ✅ gửi int
                        startActivity(intent);
                        finish();
                    })
                    .setNegativeButton("Cancel", null)
                    .show();
        }
    }

    private void initDatePicker() {
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH);
        int day = cal.get(Calendar.DAY_OF_MONTH);
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int minute = cal.get(Calendar.MINUTE);

        datePickerDialog = new DatePickerDialog(this, (view, y, m, d) -> {
            m += 1;
            dateObservation.setText(String.format("%02d/%02d/%04d", d, m, y));
            timePickerDialog.show();
        }, year, month, day);

        timePickerDialog = new TimePickerDialog(this, (view, h, min) -> {
            String currentDate = dateObservation.getText().toString();
            dateObservation.setText(String.format("%02d:%02d - %s", h, min, currentDate));
        }, hour, minute, true);
    }

    private String getTodayDate() {
        Calendar cal = Calendar.getInstance();
        return String.format("%02d:%02d - %02d/%02d/%04d",
                cal.get(Calendar.HOUR_OF_DAY),
                cal.get(Calendar.MINUTE),
                cal.get(Calendar.DAY_OF_MONTH),
                cal.get(Calendar.MONTH) + 1,
                cal.get(Calendar.YEAR));
    }
}
